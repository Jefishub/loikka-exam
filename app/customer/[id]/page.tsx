export default async function CustomerPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  //const customer = await getCustomer(id)
 
  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}