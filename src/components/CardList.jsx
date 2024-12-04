  import Card from "./Card";
  import Button from "./Button";
  import React, { useState, useEffect } from "react";
  import Search from "./Search";

  const CardList = ({data}) => {
    const defaultDataset = data.slice(0, limit);
    const [offset, setOffset] = useState(0);
    const [products, setOroducts] = useState(defaultDataset);

    const handlePrevious = () => {
      setOffset(offset - 10);
    }

    const handleNext = () => {
      setOffset(offset + 10);
    }

    useEffect(() => {
      setProducts(data.slice(offset, offset + limit));
    }, [offset, limit, data]);

    const filterTags = (tagQuery) => {
      const filtered = data.filter(product => {
        if(!tagquery){
          return product
        }
        return product.tags.find(({title}) => title === tagQuery)
      })

      setOffset(0)
      setProducts(filtered)
    }

    return (
      <div className="cf pa2">
        <Search handleSearch={filterTags} />
        <div className="mt2 mb2">
          {products && products.map((product) => (
            <Card key={product.id} {...product}/>
          ))}
        </div>

        <div className="flex items-center justify-center pa4">
          <Button text="Previous" handleclick={() => setOffset(offset - limit)} />
          <Button text="Next" handleclick={() => setOffset(offset + limit)} />
        </div>
      </div>
    )
  }