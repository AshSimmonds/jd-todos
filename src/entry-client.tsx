import { mount, StartClient } from "solid-start/entry-client";
import { client, queryClient, trpc } from "./utils/trpc";

mount(
  () => (
    <trpc.Provider client={client} queryClient={queryClient}>
      <div class="py-16 grid place-items-center">
        <StartClient />
      </div>
    </trpc.Provider>
  ),
  document
);
