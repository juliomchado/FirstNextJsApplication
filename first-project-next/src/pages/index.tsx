
import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

export default function Home({ recommendedProducts }: HomeProps) {

  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProducts => {
            return (
              <l1 key={recommendedProducts.id}>
                {recommendedProducts.title}
              </l1>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json();

  return { 
    props: {
      recommendedProducts
    }
  }
}
