import React from "react";
import {useSelector} from "react-redux";
import {Alert} from "reactstrap";
import PageHead from "../../../../common/components/Heads/PageHead";
import BlockLoader from "../../../../common/components/Loaders/BlockLoader";

const CategoryInfoSection = () => {
  const {categoryDetails} = useSelector((state) => state.categories);
  return (
    <section className="category-info">
      {categoryDetails?.loading ? (
        <BlockLoader />
      ) : categoryDetails?.error ? (
        <>
          {typeof categoryDetails?.error === "string" ? (
            <Alert color="danger">{categoryDetails?.error}</Alert>
          ) : (
            <>
              {categoryDetails?.error?.map((err, idx) => (
                <Alert color="danger" key={idx}>
                  {err.msg}
                </Alert>
              ))}
            </>
          )}
        </>
      ) : (
        <PageHead
          title={categoryDetails?.category?.name}
          description={categoryDetails?.category?.description}
        />
      )}
    </section>
  );
};

export default CategoryInfoSection;
/*
: 
*/
