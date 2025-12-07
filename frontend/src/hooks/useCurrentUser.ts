import { useQuery } from "@apollo/client/react";
import { GET_CURRENT_USER } from "../graphql/queries";

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber:string;
}

export const useCurrentUser = () => {
    const { data, loading, error, refetch } = useQuery<{ getCurrentUser: User }>(
        GET_CURRENT_USER,
        {
            fetchPolicy: 'network-only',
        }
    );

    return {
        user: data?.getCurrentUser,
        loading,
        error,
        refetch,
    };
};
