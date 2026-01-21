import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Page,
  Layout,
  Card,
  Button,
  Banner,
  Text,
  BlockStack,
  InlineStack,
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  
  return json({
    shop: session.shop,
    apiKey: process.env.SHOPIFY_API_KEY,
  });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  
  const formData = await request.formData();
  const actionType = formData.get("action");

  if (actionType === "activate") {
    const response = await admin.graphql(
      `#graphql
      mutation {
        discountAutomaticAppCreate(
          automaticAppDiscount: {
            title: "50% OFF Online Payment"
            functionId: "YOUR_FUNCTION_ID"
            startsAt: "${new Date().toISOString()}"
          }
        ) {
          automaticAppDiscount {
            discountId
            title
          }
          userErrors {
            field
            message
          }
        }
      }`
    );
    
    const result = await response.json();
    return json({ success: true, data: result });
  }

  return json({ success: false });
};

export default function Index() {
  const data = useLoaderData();

  return (
    <Page title="Payment Gateway Discount">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <Banner
              title="50% Discount for Online Payments"
              status="info"
            >
              <p>
                This app automatically applies a 50% discount when customers
                select online payment methods (excluding cash on delivery).
              </p>
            </Banner>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h2">
                  Discount Status
                </Text>
                <Text>
                  The discount function is deployed and ready to use.
                </Text>
                <InlineStack gap="300">
                  <Form method="post">
                    <input type="hidden" name="action" value="activate" />
                    <Button submit variant="primary">
                      Activate Discount
                    </Button>
                  </Form>
                </InlineStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h2">
                  How It Works
                </Text>
                <Text>
                  1. Customer adds items to cart
                </Text>
                <Text>
                  2. At checkout, they select an online payment method
                </Text>
                <Text>
                  3. 50% discount is automatically applied
                </Text>
                <Text>
                  4. Cash on delivery orders receive no discount
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h2">
                  Store Information
                </Text>
                <Text>Shop: {data.shop}</Text>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
