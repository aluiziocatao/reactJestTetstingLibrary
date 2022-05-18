import { queryAllByText, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List'

describe('List Component', () => {
    it('should render list items', async () => {
        const { getByText, rerender, queryByText } = render(<List initialItems={['Diego', 'Rodz', 'Mayk']} />)

        expect(getByText('Diego')).toBeInTheDocument()
        expect(getByText('Rodz')).toBeInTheDocument()
        expect(getByText('Mayk')).toBeInTheDocument()

        await rerender(<List initialItems={['Julia']} />)

        expect(getByText('Julia')).toBeInTheDocument()
        expect(queryByText('Mayk')).not.toBeInTheDocument()
    });

    it('should be able to add new item to the list', async () => {
        const { getByText, getByPlaceholderText } = render(<List initialItems={['']} />)
 
        const inputElement = getByPlaceholderText("Novo item");
        const addButton = getByText("Adicionar");

        userEvent.type(inputElement, "N");
        userEvent.click(addButton);

        await waitFor(() => {
            expect(getByText("N")).toBeInTheDocument()
        })

    });

    it('should be able to remove item from the list', async () => {
        const { getAllByText, queryByText } = render(<List initialItems={['Diego']} />)

        const removeButtons = getAllByText("Remover");

        userEvent.click(removeButtons[0]);

        await waitFor(() => {
            expect(queryByText("Diego")).not.toBeInTheDocument()
        })

    });
});

// test('sum', () => {
//     const { getByText } = render(<App />)

//     expect(getByText('Hello World')).toBeTruthy()
//     expect(getByText('Hello World')).toBeInTheDocument()
//     expect(getByText('Hello World')).toHaveAttribute('class', 'test')
// })