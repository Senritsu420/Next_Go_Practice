'use client'

import { postUser, userUrl } from "@/app/api/user/route";
import { Button, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "../atoms/FormInput";
import { FormNumberInput } from "../atoms/FormNumberInput";

interface UserProps {
    name: string
    age: string // ChakraUIのNumberInputは値がstringになるため
}

export const UserForm = () => {
    const { register, handleSubmit } = useForm<UserProps>()

    const onSubmit: SubmitHandler<UserProps> = async(data: UserProps) => {
        const formattedData = {
            name: data.name,
            age: parseInt(data.age, 10) // numberに変換
        }
        const res = await postUser(userUrl, formattedData)
        console.log(res)
    }

    return (
        <Flex direction="column" gap="10px">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <FormInput placeholder="ユーザー太郎" register={register("name", { required: "名前を入力してください"})} />

                    <FormLabel>Age</FormLabel>
                    <FormNumberInput max={100} min={0} defaultValue={0} register={register("age", { required: "年齢を入力してください", valueAsNumber: true})} />
                </FormControl>
                <Button type="submit" mt={4}>新規作成</Button>
            </form>
        </Flex>
    )
}