import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'

import { Container } from './styles'

import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupsGetAll'
import { Loading } from '@components/Loading'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Nova Turma', 'Não foi possível carregar as turmas.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subTitle="jogue com a sua turma" />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            groups.length === 0 && { flex: 1 },
          ]}
          ListEmptyComponent={
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  )
}
