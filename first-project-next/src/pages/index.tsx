
import { GetServerSideProps } from 'next';
import Link from 'next/link'
import { Title } from '@/styles/pages/Home'
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript'
import PrismicDom from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {

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
                <Link href={`/catalog/products/${recommendedProducts.uid}`}>
                  <a>
                    {PrismicDom.RichText.asText(recommendedProducts.data.title)}
                   <br />
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {

  
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])


  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}
