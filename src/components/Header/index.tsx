import { Container, Logo } from './styles'

import logo from '@assets/logo.png'

export function Header() {
  return (
    <Container>
      <Logo source={logo} />
    </Container>
  )
}
