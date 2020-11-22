import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from "next"
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript'
import PrismicDom from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'

interface IProductProps {
    product: Document;
}

export default function Product({ product }: IProductProps) {
    const router = useRouter();

    if(router.isFallback){
        return <p>Loading...</p>
    }

    console.log(product.data)

    return (
        <div>
            <h1>{PrismicDom.RichText.asText(product.data.title)}</h1>

            <img src={product.data.thumbnail.url} width="300" alt=""/>

            <div dangerouslySetInnerHTML={{__html: PrismicDom.RichText.asHtml(product.data.description)}}></div>
            <p>Price: ${product.data.price}</p>
        
        </div>
        )
}

export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<IProductProps> = async (context) => {
    const { slug } = context.params;

    const product = await client().getByUID('product', String(slug), {})
    
    return {
        props: {
            product
        },
        revalidate: 5,
    }
}
