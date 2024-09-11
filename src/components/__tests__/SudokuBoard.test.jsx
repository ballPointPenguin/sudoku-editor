// src/components/__tests__/SudokuBoard.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SudokuBoard from '../SudokuBoard'

describe('SudokuBoard', () => {
  test('renders the Sudoku board with 81 cells', () => {
    render(<SudokuBoard />)
    const cells = screen.getAllByRole('textbox')
    expect(cells.length).toBe(81)
  })

  test('allows entering numbers in cells', () => {
    render(<SudokuBoard />)
    const cells = screen.getAllByRole('textbox')
    fireEvent.change(cells[0], { target: { value: '5' } })
    expect(cells[0]).toHaveValue('5')
  })

  test('clears cell value when space is pressed', () => {
    render(<SudokuBoard />)
    const cells = screen.getAllByRole('textbox')
    fireEvent.change(cells[0], { target: { value: '5' } })
    expect(cells[0]).toHaveValue('5')
    fireEvent.keyDown(cells[0], { key: ' ', code: 'Space' })
    expect(cells[0]).toHaveValue('')
  })

  test('changes mode when control buttons are clicked', () => {
    render(<SudokuBoard />)
    const normalButton = screen.getByText('Normal')
    const cornerButton = screen.getByText('Corner')
    const centerButton = screen.getByText('Center')

    expect(normalButton).toHaveClass('bg-blue-500')

    fireEvent.click(cornerButton)
    expect(cornerButton).toHaveClass('bg-blue-500')
    expect(normalButton).not.toHaveClass('bg-blue-500')

    fireEvent.click(centerButton)
    expect(centerButton).toHaveClass('bg-blue-500')
    expect(cornerButton).not.toHaveClass('bg-blue-500')
  })

  test('displays solution status', async () => {
    render(<SudokuBoard />)
    await waitFor(() => {
      expect(screen.getByText(/Number of solutions: 1/)).toBeInTheDocument()
    })
  })

  test('matches snapshot', () => {
    const { asFragment } = render(<SudokuBoard />)
    expect(asFragment()).toMatchSnapshot()
  })
})
