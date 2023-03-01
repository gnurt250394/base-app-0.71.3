interface ActionData<T> {
    [key: string]: T
}
export interface ActionPersist<T> {
    type: string,
    data?: T,
    token?: string,
    role?: string,
    payload?: ActionData<T>
}
