import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/tags')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/tags"!</div>
}
