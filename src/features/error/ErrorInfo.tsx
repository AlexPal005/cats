export const ErrorInfo = ({ message }: { message: string }) => {
  return (
    <div className="text-center text-red-500 text-xl font-semibold">
      {message}
    </div>
  )
}
