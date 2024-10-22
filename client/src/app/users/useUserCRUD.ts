import { User } from "@/models";
import { useCreateUserMutation } from "@/state/api";
import { v4 } from "uuid";

export function useUserCRUD() {
    const [createUser] = useCreateUserMutation();

    const newUser: User = {
        userId: v4(),
        name: "",
        email: ""
    };
  
    const handleCreateUser = async (
      user: Omit<User, "userId">
    ) => {
      await createUser(user);
    };

    return {
        newUser,
        handleCreateUser
    }
}