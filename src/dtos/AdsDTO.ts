export type AdsDTO = {
    id?: string;
    name: string;
    description: string;
    price: number;
    is_new: boolean;
    accept_trade: boolean;
    payment_methods: string[];
    images: ImageStyleProps[]; 
};

export type ImageStyleProps = {
    uri: string;
    type: string;
};
  
