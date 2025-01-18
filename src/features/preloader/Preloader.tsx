interface PreloaderProps {
  size?: string
}

export const Preloader = ({ size = 'text-xl' }: PreloaderProps) => {
  return <div className={`text-center ${size}`}>Loading...</div>
}
