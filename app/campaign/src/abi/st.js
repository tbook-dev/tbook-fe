export default [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_galaxy_signer",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_campaign_setter",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_contract_manager",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_treasury_manager",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ECDSAInvalidSignature",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "length",
                "type": "uint256"
            }
        ],
        "name": "ECDSAInvalidSignatureLength",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "ECDSAInvalidSignatureS",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidShortString",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "str",
                "type": "string"
            }
        ],
        "name": "StringTooLong",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "EIP712DomainChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            }
        ],
        "name": "EventActivateCampaign",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_dummyId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_nftID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "contract IRdNFT",
                "name": "_starNFT",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "EventClaim",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "_dummyIdArr",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "_nftIDArr",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "contract IRdNFT",
                "name": "_starNFT",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "EventClaimBatch",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "_dummyIdArr",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "_nftIDArr",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "contract IRdNFT",
                "name": "_starNFT",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_minted",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_cap",
                "type": "uint256"
            }
        ],
        "name": "EventClaimBatchCapped",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_dummyId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_nftID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "contract IRdNFT",
                "name": "_starNFT",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_minted",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_cap",
                "type": "uint256"
            }
        ],
        "name": "EventClaimCapped",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_dummyId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_nftID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "contract IRdNFT",
                "name": "_starNFT",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "EventForge",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_platformFee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_erc20Fee",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_erc20",
                "type": "address"
            }
        ],
        "name": "activateCampaign",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "campaignFeeConfigs",
        "outputs": [
            {
                "internalType": "address",
                "name": "erc20",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "erc20Fee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "platformFee",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "campaign_setter",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            },
            {
                "internalType": "contract IRdNFT",
                "name": "_starNFT",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_dummyId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_powah",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_mintTo",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_signature",
                "type": "bytes"
            }
        ],
        "name": "claim",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            },
            {
                "internalType": "contract IRdNFT",
                "name": "_starNFT",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "_dummyIdArr",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_powahArr",
                "type": "uint256[]"
            },
            {
                "internalType": "address",
                "name": "_mintTo",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_signature",
                "type": "bytes"
            }
        ],
        "name": "claimBatch",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            },
            {
                "internalType": "contract IRdNFT",
                "name": "_starNFT",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "_dummyIdArr",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_powahArr",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "_cap",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_mintTo",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_signature",
                "type": "bytes"
            }
        ],
        "name": "claimBatchCapped",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            },
            {
                "internalType": "contract IRdNFT",
                "name": "_starNFT",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_dummyId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_powah",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_cap",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_mintTo",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_signature",
                "type": "bytes"
            }
        ],
        "name": "claimCapped",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "eip712Domain",
        "outputs": [
            {
                "internalType": "bytes1",
                "name": "fields",
                "type": "bytes1"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "version",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "chainId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "verifyingContract",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "salt",
                "type": "bytes32"
            },
            {
                "internalType": "uint256[]",
                "name": "extensions",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            },
            {
                "internalType": "contract IRdNFT",
                "name": "_starNFT",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "_nftIDs",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "_dummyId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_powah",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_mintTo",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_signature",
                "type": "bytes"
            }
        ],
        "name": "forge",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "galaxy_signer",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "hasMinted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "manager",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "numMinted",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "_paused",
                "type": "bool"
            }
        ],
        "name": "setPause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "treasury_manager",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "updateCampaignSetter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "updateGalaxySigner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "updateManager",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "updateTreasureManager",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]