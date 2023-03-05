import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindConfig from '@tbook/share/css/tailwind.config'

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
}