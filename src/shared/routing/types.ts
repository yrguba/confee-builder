type ParamsOpt = {
    chat_id: string | undefined;
    user_id: string | undefined;
};

export type Params = Readonly<Partial<ParamsOpt>>;
