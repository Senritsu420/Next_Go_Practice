'use client'

import { getAllUser, userUrl } from '@/app/api/user/route'
import { Text } from '@chakra-ui/react'
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import useSWR from 'swr'
import { TableButton } from '../atoms/TableButton'
import { useRecoilState } from 'recoil'
import { UserState } from '../atoms/UserState'
import { useRouter } from 'next/navigation'

interface ResponseProps {
    id: number
    name: string
    age: number
}

export const UserTable = () => {
    const { data, error } = useSWR(userUrl, getAllUser)
    const [user, setUser] = useRecoilState(UserState)
    const router = useRouter()

    const PutOnSubmit = (data: ResponseProps) => {
        setUser((currentUser) => ({
            ...currentUser,
            ...{
                id: data.id,
                name: data.name,
                age: data.age,
            },
        }))
        router.push(`update/${data.id}`)
    }

    return (
        <>
            {error && <Text>error</Text>}
            {!data ? (
                <Text>読み込み中</Text>
            ) : (
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Imperial to metric conversion factors</TableCaption>
                        <Thead>
                            <Tr>
                                <Th isNumeric>Id</Th>
                                <Th>Name</Th>
                                <Th isNumeric>Age</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((record: ResponseProps) => (
                                <Tr key={record.id}>
                                    <Td isNumeric>{record.id}</Td>
                                    <Td>{record.name}</Td>
                                    <Td isNumeric>{record.age}</Td>
                                    <Td>
                                        <TableButton
                                            title='更新'
                                            color='teal'
                                            onClick={() => PutOnSubmit(record)}
                                        />
                                    </Td>
                                    {/* <Td>
                        <TableButton title='削除' color='red' onClick={} />
                    </Td> */}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}
