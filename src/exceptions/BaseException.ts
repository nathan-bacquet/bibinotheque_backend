export default class BaseException extends Error {
    public message: string;
    public status: number;
    public code: string;
}
