import {  useState } from "react";
import { UserResponse } from "@/infrastructure/interfaces";

const initialProfile = {
  name: "John Doe",
  email: "johndoe@gmail.com",
  age: 30,
};

export const useProfile = () => {
  const [profile,] = useState<UserResponse>(initialProfile);


  return {
    profile,
  };
}