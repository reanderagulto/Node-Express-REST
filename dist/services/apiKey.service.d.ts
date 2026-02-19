export declare const validateApiKey: (key: string) => Promise<{
    id: string;
    createdAt: Date;
    name: string;
    key: string;
    isActive: boolean;
} | null>;
export declare const createNewApiKey: (name: string) => Promise<{
    id: string;
    createdAt: Date;
    name: string;
    key: string;
    isActive: boolean;
}>;
export declare const getAllApiKeys: () => Promise<{
    id: string;
    createdAt: Date;
    name: string;
    isActive: boolean;
}[]>;
export declare const getApiKeyByIdentifier: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    name: string;
    key: string;
    isActive: boolean;
} | null>;
export declare const updateApiKeyDetails: (id: string, data: {
    name?: string;
    isActive?: boolean;
}) => Promise<{
    id: string;
    createdAt: Date;
    name: string;
    key: string;
    isActive: boolean;
}>;
export declare const deleteApiKeyById: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    name: string;
    key: string;
    isActive: boolean;
}>;
