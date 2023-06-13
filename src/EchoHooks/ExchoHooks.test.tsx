import { act, render, screen, waitFor, } from "@testing-library/react";
import EchoHooks from "./EchoHooks";

export { WebSocket as default } from "mock-socket";

let ws: WebSocket;

//WIP
xdescribe('Example', () => {
    beforeEach(async () => {
        ws = new WebSocket("ws://localhost:8080");

        window.WebSocket = WebSocket;      
    });

    afterEach(() => {
        ws.close();
    });

    it('should test the socket', async () => {
        let msg: HTMLElement;
        render(<EchoHooks />); 

        const button  = screen.getByRole('button', {
            name: /Send Socket every 2 Sec/i
        })
        act(() => {
            button.click();
        });

/*        await waitFor(() => {
            ws.send('Zvi Dubin: test message from mock server');
        });
 */     

       await new Promise((r) => setTimeout(r, 3000));

        act(() => {
            expect(ws.url).toBe('ws://localhost:8080/');
        });

        msg = screen.getByText(/Zvi Dubin:/i); 

        act( () => {
            expect(msg).toBeInTheDocument();
        });
    });
}); 