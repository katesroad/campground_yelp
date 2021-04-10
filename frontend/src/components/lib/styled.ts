import styled from 'styled-components'
import { small, medium, xlarge } from 'styles/media-queries'

export const Content = styled.div`
  position: relative;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  ${small} {
    padding-left: 24px;
    padding-right: 24px;
  }
  ${medium} {
    width: 89.5%;
    padding-right: 0;
    padding-left: 0;
    margin-left: auto;
    margin-right: auto;
  }
  ${xlarge} {
    max-width: 68.75rem;
  }
`

export const Card = styled.div`
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.375rem;
`
export const Button = styled.button.attrs(() => ({ className: 'btn' }))`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  text-transform: capitalize;
  text-align: center;
  color: var(--bs-white);
`