use shopify_function::prelude::*;
use shopify_function::Result;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct Input {
    cart: Cart,
    payment_methods: Vec<PaymentMethod>,
}

#[derive(Deserialize)]
struct Cart {
    lines: Vec<CartLine>,
    cost: Cost,
}

#[derive(Deserialize)]
struct CartLine {
    id: String,
    quantity: i64,
    cost: Cost,
}

#[derive(Deserialize)]
struct Cost {
    #[serde(rename = "subtotalAmount")]
    subtotal_amount: Amount,
}

#[derive(Deserialize)]
struct Amount {
    amount: String,
}

#[derive(Deserialize)]
struct PaymentMethod {
    #[serde(rename = "type")]
    payment_type: String,
}

#[derive(Serialize)]
struct Output {
    discounts: Vec<Discount>,
}

#[derive(Serialize)]
struct Discount {
    message: String,
    targets: Vec<Target>,
    value: Value,
}

#[derive(Serialize)]
#[serde(tag = "type", rename_all = "camelCase")]
enum Target {
    OrderSubtotal { excluded_variant_ids: Vec<String> },
}

#[derive(Serialize)]
#[serde(tag = "type", rename_all = "camelCase")]
enum Value {
    Percentage { value: String },
}

#[shopify_function]
fn function(input: Input) -> Result<Output> {
    let mut discounts = vec![];

    // Check if any payment method is an online gateway (not cash on delivery)
    let has_online_payment = input.payment_methods.iter().any(|pm| {
        pm.payment_type != "cash_on_delivery" 
            && pm.payment_type != "manual" 
            && pm.payment_type != "cod"
    });

    // Apply 50% discount if online payment is selected
    if has_online_payment {
        discounts.push(Discount {
            message: "50% OFF for Online Payment".to_string(),
            targets: vec![Target::OrderSubtotal {
                excluded_variant_ids: vec![],
            }],
            value: Value::Percentage {
                value: "50".to_string(),
            },
        });
    }

    Ok(Output { discounts })
}
