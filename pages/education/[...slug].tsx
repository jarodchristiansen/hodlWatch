import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GET_POST } from "../../helpers/queries/posts";

const EducationArticle = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [getPost, { data, loading, error: getPostError, called, refetch }] =
    useLazyQuery(GET_POST);

  useEffect(() => {
    if (slug) {
      getPost({
        variables: {
          slug: "/" + slug.toString(),
        },
      });
    }
  }, [slug]);

  useEffect(() => {
    if (data?.getPost) {
      //   setInitialValues();
      console.log({ data });
    }
  }, [data]);

  console.log({ slug });

  return <div></div>;
};

export default EducationArticle;
