import { TouchableOpacityProps } from 'react-native'
import { ButtonIconTypesStyleProps, Container, Icon } from './styles'
import { MaterialIcons } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  type?: ButtonIconTypesStyleProps
  icon: keyof typeof MaterialIcons.glyphMap
}

export function ButtonIcon({ type = 'PRIMARY', icon, ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  )
}
