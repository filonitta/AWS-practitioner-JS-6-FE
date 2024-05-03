import API_PATHS from "~/constants/apiPaths";
import ProductsTable from "~/components/pages/admin/PageProductImport/components/ProductsTable";
import CSVFileImport from "~/components/pages/admin/PageProductImport/components/CSVFileImport";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useAvailableProducts } from "~/queries/products";
import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function PageProductImport() {
  const [isLoading, setIsLoading] = useState(false);
  const { data = [], refetch } = useAvailableProducts();

  const handleUpdateProducts = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      await refetch();
      setIsLoading(false);
    }, 5000); // workaround to wait untill the database is changed
  };

  return (
    <Box py={3}>
      <Box mb={2} display="flex" justifyContent="space-between">
        <CSVFileImport
          url={`${API_PATHS.import}/import`}
          title="Import Products CSV"
          onSuccess={handleUpdateProducts}
        />

        <Button
          size="small"
          color="primary"
          variant="contained"
          sx={{ alignSelf: "end" }}
          component={Link}
          to={"/admin/product-form"}
        >
          Create product
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      <ProductsTable data={data} />
    </Box>
  );
}
