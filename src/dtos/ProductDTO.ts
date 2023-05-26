export type ProductDTO = {
    id?: string;
    name: string;
    description: string;
    price: number;
    is_new: boolean;
    accept_trade: boolean;
    payment_methods: string[];
    product_images?: ImageStyleProps[]; //NAO OBRIGATORIO DEPOIS TIRAR
    user: UserProps;
    onClick?: (userProduct_id: string) => Promise <void>;
    is_active?: boolean;
};

export type ImageStyleProps = {
    id: string;
    path: string;
};

export type UserProps = {
    avatar?: string;
};