import { Montserrat , Inter, Poppins} from 'next/font/google'


export const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '700'], // Specify the weights you need
  });

  export const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'], // Specify the weights you need
  });

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Specify the weights you need
});