/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS userOrders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    product_id UUID NOT NULL
)