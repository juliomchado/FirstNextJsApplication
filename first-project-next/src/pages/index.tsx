
import { GetServerSideProps } from 'next';
import { Title } from '@/styles/pages/Home'
import SEO from '@/components/SEO';
interface IProduct {
  id: string;
  title: string;
}

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {

    const math = (await import('../lib/math')).default

    alert(math.sum(3, 5))

  }

  return (
    <div>

      <SEO
      title="DevCommerce, your best dev e-commerce!" 
      image="boost.png"
      shouldExcludeTitleSuffix
      
      />


      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProducts => {
            return (
              <li key={recommendedProducts.id}>
                {recommendedProducts.title}<br />
              </li>
            )
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}
