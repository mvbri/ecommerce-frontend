import React from 'react'
import ProductSheet from '../components/ProductSheet'
import { useParams } from 'react-router-dom';
import StandardSection from '../components/StandardSection';
import HomeLayout from '../layout/HomeLayout';

const ShowProduct = () => {
  const params = useParams();
  return (
    <HomeLayout>
     <StandardSection>
      <ProductSheet slug={params.slug}/>
     </StandardSection>
    </HomeLayout>
  )
}

export default ShowProduct