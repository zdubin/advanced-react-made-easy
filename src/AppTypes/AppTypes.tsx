import {Dispatch, ReactNode, SetStateAction} from "react";

export type UserType = {
    name: string,
    lastName: string,
    setName?: Dispatch<SetStateAction<string>>,
    setLastName?: Dispatch<SetStateAction<string>>,
}
// TODO: rename this to a better name
export type childProps = {
    children: ReactNode | undefined
}
export interface Article {
    title: string;
    description: string;
    img?: string;
}
export interface CalcState {
    firstValue: number;
    secondValue: number;
    total?: number;
    lastOperation?: string;
    articles?: Article[];

}
export type LazyComponent = {
    name: string;
    url: string;
    component: React.LazyExoticComponent<React.FC<any>> ;
}
export type CounterExampleProps = {
    initialValue: number;
}

export type XorO = 'X' | 'O' | null;
