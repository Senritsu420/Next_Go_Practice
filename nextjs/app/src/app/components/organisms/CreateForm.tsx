'use client'

import { getAllUser, postUser, putUser, userUrl } from '@/app/api/user/route'
import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useSWR from 'swr'
import { FormInput } from '../atoms/FormInput'
import { FormNumberInput } from '../atoms/FormNumberInput'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { UserState } from '../atoms/UserState'
import { IsUpdateState } from '../atoms/IsUpdate'
import { ChangeEvent } from 'react'

interface UserProps {
    name: string
    age: string // ChakraUIのNumberInputは値がstringになるため
}

export const CreateForm = () => {
    const [user, setUser] = useRecoilState(UserState)
    const [isUpdate, setIsUpdate] = useRecoilState(IsUpdateState)
    const resetUser = useResetRecoilState(UserState)
    const { register, handleSubmit } = useForm<UserProps>()
    const { data, mutate } = useSWR(userUrl, getAllUser)

    const CreateOnSubmit: SubmitHandler<UserProps> = async (query: UserProps) => {
        const formattedData = {
            name: query.name,
            age: parseInt(query.age, 10), // numberに変換
        }
        const res = await postUser(userUrl, formattedData)
        console.log(res)
        mutate(data)
        resetUser()
    }

    const UpdateOnSubmit: SubmitHandler<UserProps> = async (query: UserProps) => {
        const formattedData = {
            name: query.name,
            age: parseInt(query.age, 10), // numberに変換
        }
        const res = await putUser(user.id, userUrl, formattedData)
        console.log(res)
        mutate(data)
        resetUser()
        setIsUpdate(false)
    }

    return (
        <>
            {isUpdate ? (
                <form onSubmit={handleSubmit(UpdateOnSubmit)}>
                    <FormControl isRequired>
                        <Flex gap='5px' alignItems='flex-end'>
                            <Flex direction='column'>
                                <FormLabel>Name</FormLabel>
                                <FormInput
                                    placeholder='ユーザー太郎'
                                    register={register('name', {
                                        required: '名前を入力してください',
                                    })}
                                    value={user.name}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setUser(() => ({
                                            ...{
                                                id: user.id,
                                                name: e.target.value,
                                                age: user.age,
                                            },
                                        }))
                                    }
                                />
                            </Flex>
                            <Flex direction='column'>
                                <FormLabel>Age</FormLabel>
                                <FormNumberInput
                                    max={100}
                                    min={0}
                                    register={register('age', {
                                        required: '年齢を入力してください',
                                        valueAsNumber: true,
                                    })}
                                    value={user.age}
                                    onChange={(valueAsNumber) =>
                                        setUser(() => ({
                                            ...{
                                                id: user.id,
                                                name: user.name,
                                                age: Number(valueAsNumber),
                                            },
                                        }))
                                    }
                                />
                            </Flex>
                            <Button type='submit' variant='outline'>
                                更新
                            </Button>
                        </Flex>
                    </FormControl>
                </form>
            ) : (
                <form onSubmit={handleSubmit(CreateOnSubmit)}>
                    <FormControl isRequired>
                        <Flex gap='5px' alignItems='flex-end'>
                            <Flex direction='column'>
                                <FormLabel>Name</FormLabel>
                                <FormInput
                                    placeholder='ユーザー太郎'
                                    register={register('name', {
                                        required: '名前を入力してください',
                                    })}
                                    value={user.name}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setUser(() => ({
                                            ...{
                                                id: user.id,
                                                name: e.target.value,
                                                age: user.age,
                                            },
                                        }))
                                    }
                                />
                            </Flex>
                            <Flex direction='column'>
                                <FormLabel>Age</FormLabel>
                                <FormNumberInput
                                    max={100}
                                    min={0}
                                    register={register('age', {
                                        required: '年齢を入力してください',
                                        valueAsNumber: true,
                                    })}
                                    value={user.age}
                                    onChange={(valueAsNumber) =>
                                        setUser(() => ({
                                            ...{
                                                id: user.id,
                                                name: user.name,
                                                age: Number(valueAsNumber),
                                            },
                                        }))
                                    }
                                />
                            </Flex>
                            <Button type='submit' variant='outline'>
                                追加
                            </Button>
                        </Flex>
                    </FormControl>
                </form>
            )}
        </>
    )
}
