import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from "react";
import { Web3Modal } from "@web3modal/standalone";
import { apiGetChainNamespace } from "caip-api";
import UniversalProvider from "@walletconnect/universal-provider";
import Web3 from "web3";
import { DEFAULT_LOGGER, DEFAULT_PROJECT_ID, DEFAULT_RELAY_URL } from "../utils/const";
import { utils } from "ethers";
import { getAllChainNamespaces } from "../utils/Utils";
/**
 * Context
 */
export const ClientContext = createContext({});
/**
 * Provider
 */
export function ClientContextProvider({ children }) {
    const [client, setClient] = useState();
    const [pairings, setPairings] = useState([]);
    const [session, setSession] = useState();
    const [ethereumProvider, setEthereumProvider] = useState();
    const [web3Provider, setWeb3Provider] = useState();
    const [isFetchingBalances, setIsFetchingBalances] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [hasCheckedPersistedSession, setHasCheckedPersistedSession] = useState(false);
    const [balances, setBalances] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [chainData, setChainData] = useState({});
    const [chain, setChain] = useState("");
    const [web3Modal, setWeb3Modal] = useState();

    const resetApp = () => {
        setPairings([]);
        setSession(undefined);
        setBalances({});
        setAccounts([]);
        setChain("");
    };

    const loadChainData = async () => {
        const namespaces = getAllChainNamespaces();
        const chainData = {};
        await Promise.all(namespaces.map(async (namespace) => {
            let chains;
            try {
                chains = await apiGetChainNamespace(namespace);
            }
            catch (e) {
                // ignore error
            }
            if (typeof chains !== "undefined") {
                chainData[namespace] = chains;
            }
        }));
        setChainData(chainData);
    };

    const disconnect = useCallback(async () => {
        if (typeof ethereumProvider === "undefined") {
            throw new Error("ethereumProvider is not initialized");
        }
        await ethereumProvider.disconnect();
        resetApp();
    }, [ethereumProvider]);

    const _subscribeToProviderEvents = useCallback(async (_client) => {
        if (typeof _client === "undefined") {
            throw new Error("WalletConnect is not initialized");
        }
        _client.on("display_uri", async (uri) => {
            console.log("EVENT", "QR Code Modal open");
            web3Modal === null || web3Modal === void 0 ? void 0 : web3Modal.openModal({ uri });
        });
        // Subscribe to session ping
        _client.on("session_ping", ({ id, topic }) => {
            console.log("EVENT", "session_ping");
            console.log(id, topic);
        });
        // Subscribe to session event
        _client.on("session_event", ({ event, chainId }) => {
            console.log("EVENT", "session_event");
            console.log(event, chainId);
        });
        // Subscribe to session update
        _client.on("session_update", ({ topic, session }) => {
            console.log("EVENT", "session_updated");
            setSession(session);
        });
        // Subscribe to session delete
        _client.on("session_delete", ({ id, topic }) => {
            console.log("EVENT", "session_deleted");
            console.log(id, topic);
            resetApp();
        });
    }, [web3Modal]);

    const createClient = useCallback(async () => {
        try {
            setIsInitializing(true);
            const provider = await UniversalProvider.init({
                projectId: DEFAULT_PROJECT_ID,
                logger: DEFAULT_LOGGER,
                relayUrl: DEFAULT_RELAY_URL,
            });
            const web3Modal = new Web3Modal({
                projectId: DEFAULT_PROJECT_ID,
            });
            setEthereumProvider(provider);
            setClient(provider.client);
            setWeb3Modal(web3Modal);
        }
        catch (err) {
            throw err;
        }
        finally {
            setIsInitializing(false);
        }
    }, []);

    const createWeb3Provider = useCallback((ethereumProvider) => {
        const web3Provider = new Web3(ethereumProvider);
        setWeb3Provider(web3Provider);
    }, []);

    const connect = useCallback(async (caipChainId, pairing) => {
        if (!ethereumProvider) {
            throw new ReferenceError("WalletConnect Client is not initialized.");
        }
        const chainId = caipChainId.split(":").pop();
        console.log("Enabling EthereumProvider for chainId: ", chainId);
        const customRpcs = Object.keys(chainData.eip155).reduce((rpcs, chainId) => {
            rpcs[chainId] = chainData.eip155[chainId].rpc[0];
            return rpcs;
        }, {});
        const session = await ethereumProvider.connect({
            namespaces: {
                eip155: {
                    methods: [
                        "eth_sendTransaction",
                        "eth_signTransaction",
                        "eth_sign",
                        "personal_sign",
                        "eth_signTypedData",
                    ],
                    chains: [`eip155:${chainId}`],
                    events: ["chainChanged", "accountsChanged"],
                    rpcMap: customRpcs,
                },
            },
            pairingTopic: pairing === null || pairing === void 0 ? void 0 : pairing.topic,
        });
        createWeb3Provider(ethereumProvider);
        const _accounts = await ethereumProvider.enable();
        console.log("_accounts", _accounts);
        setAccounts(_accounts);
        setSession(session);
        setChain(caipChainId);
        web3Modal === null || web3Modal === void 0 ? void 0 : web3Modal.closeModal();
    }, [ethereumProvider, chainData.eip155, createWeb3Provider, web3Modal]);

    const onSessionConnected = useCallback(async (_session) => {
        if (!ethereumProvider) {
            throw new ReferenceError("EthereumProvider is not initialized.");
        }
        const allNamespaceAccounts = Object.values(_session.namespaces)
            .map(namespace => namespace.accounts)
            .flat();
        const allNamespaceChains = Object.keys(_session.namespaces);
        const chainData = allNamespaceAccounts[0].split(":");
        const caipChainId = `${chainData[0]}:${chainData[1]}`;
        console.log("restored caipChainId", caipChainId);
        setChain(caipChainId);
        setSession(_session);
        setAccounts(allNamespaceAccounts.map(account => account.split(":")[2]));
        console.log("RESTORED", allNamespaceChains, allNamespaceAccounts);
        createWeb3Provider(ethereumProvider);
    }, [ethereumProvider, createWeb3Provider]);

    const _checkForPersistedSession = useCallback(async (provider) => {
        if (typeof provider === "undefined") {
            throw new Error("WalletConnect is not initialized");
        }
        const pairings = provider.client.pairing.getAll({ active: true });
        // populates existing pairings to state
        setPairings(pairings);
        console.log("RESTORED PAIRINGS: ", pairings);
        if (typeof session !== "undefined")
            return;
        // populates (the last) existing session to state
        if (ethereumProvider === null || ethereumProvider === void 0 ? void 0 : ethereumProvider.session) {
            const _session = ethereumProvider === null || ethereumProvider === void 0 ? void 0 : ethereumProvider.session;
            console.log("RESTORED SESSION:", _session);
            await onSessionConnected(_session);
            return _session;
        }
    }, [session, ethereumProvider, onSessionConnected]);

    useEffect(() => {
        loadChainData();
    }, []);

    useEffect(() => {
        if (!client) {
            createClient();
        }
    }, [client, createClient]);

    useEffect(() => {
        if (ethereumProvider && web3Modal)
            _subscribeToProviderEvents(ethereumProvider);
    }, [_subscribeToProviderEvents, ethereumProvider, web3Modal]);

    useEffect(() => {
        const fetchBalances = async () => {
            if (!web3Provider || !accounts)
                return;
            try {
                setIsFetchingBalances(true);
                const _balances = await Promise.all(accounts.map(async (account) => {
                    const balance = await web3Provider.eth.getBalance(account);
                    return {
                        account,
                        symbol: "ETH",
                        balance: utils.formatEther(balance),
                        contractAddress: "",
                    };
                }));
                const balancesByAccount = _balances.reduce((obj, balance) => {
                    obj[balance.account] = balance;
                    return obj;
                }, {});
                setBalances(balancesByAccount);
            }
            catch (error) {
                throw new Error(error);
            }
            finally {
                setIsFetchingBalances(false);
            }
        };
        fetchBalances();
    }, [web3Provider, accounts]);

    useEffect(() => {
        const getPersistedSession = async () => {
            if (!ethereumProvider)
                return;
            await _checkForPersistedSession(ethereumProvider);
            setHasCheckedPersistedSession(true);
        };
        if (ethereumProvider && chainData && !hasCheckedPersistedSession) {
            getPersistedSession();
        }
    }, [ethereumProvider, chainData, _checkForPersistedSession, hasCheckedPersistedSession]);

    const value = useMemo(() => ({
        pairings,
        isInitializing,
        balances,
        isFetchingBalances,
        accounts,
        chain,
        client,
        session,
        disconnect,
        connect,
        chainData,
        web3Provider,
    }), [
        pairings,
        isInitializing,
        balances,
        isFetchingBalances,
        accounts,
        chain,
        client,
        session,
        disconnect,
        connect,
        chainData,
        web3Provider,
    ]);
    return (React.createElement(ClientContext.Provider, { value: Object.assign({}, value) }, children));
}

export function useWalletConnectClient() {
    const context = useContext(ClientContext);
    if (context === undefined) {
        throw new Error("useWalletConnectClient must be used within a ClientContextProvider");
    }
    return context;
}