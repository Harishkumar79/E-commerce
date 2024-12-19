export const registerFormControls = [
    {
        name : "userName",
        label : "User Name",
        placeholder : "Enter your user name",
        componentType : "input",
        type : "text"
    },
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        componentType : "input",
        type : "email"
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        componentType : "input",
        type : "password"
    }
]

export const loginFormControls = [
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        componentType : "input",
        type : "email"
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        componentType : "input",
        type : "password"
    }
];

export const addProductFormControls = [
    {
        name: "productName",
        label: "Product Name",
        placeholder: "Enter the product name",
        componentType: "input",
        type: "text",
    },
    {
        name: "description",
        label: "Description",
        placeholder: "Enter a brief description of the product",
        componentType: "textarea",
    },
    {
        name: "price",
        label: "Price",
        placeholder: "Enter the product price",
        componentType: "input",
        type: "number",
    },
    {
        name: "category",
        label: "Category",
        placeholder: "Select a category",
        componentType: "select",
        options: [
            { value: "men", label: "Men" },
            { value: "women", label: "Women" },
            { value: "kids", label: "Kids" },
            { value: "accessories", label: "Accessories" },
        ],
    },
    {
        name: "size",
        label: "Size",
        placeholder: "Select a size",
        componentType: "select",
        options: [
            { value: "S", label: "Small (S)" },
            { value: "M", label: "Medium (M)" },
            { value: "L", label: "Large (L)" },
            { value: "XL", label: "Extra Large (XL)" },
        ],
    },
    {
        name: "color",
        label: "Color",
        placeholder: "Enter the product color",
        componentType: "input",
        type: "text",
    },
    {
        name: "stock",
        label: "Stock",
        placeholder: "Enter the number of items in stock",
        componentType: "input",
        type: "number",
    },
    // {
    //     name: "image",
    //     label: "Product Image",
    //     placeholder: "Upload a product image",
    //     componentType: "file",
    //     type: "file",
    // },
];