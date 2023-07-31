import { Modal } from 'antd'
import { useCurrentProject } from '@tbook/hooks'
import { useRequest } from 'ahooks'
import { getCredential } from '@/api/incentive'

export default function CredentialModal ({ open }) {
  const { projectId } = useCurrentProject()
  const { data: credentialList } = useRequest(() => getCredential(projectId), {
    refreshDeps: [projectId],
    ready: !!projectId
  })
  console.log({ credentialList })
  return <Modal open={open}>x</Modal>
}
