import { createServer } from "@graphql-yoga/node";
import { createClient } from "@supabase/supabase-js";
import typeDefs from "../../server/graphql/typeDefs";
import resolvers from "../../server/graphql/resolvers";
import createSupabaseRepository from "../../server/repositories/createSupabaseRepository";
import createRoomsService from "../../server/services/createRoomsService";

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: "/api/graphql",
  context: ({ request }) => {
    const playerId = request.headers.get("x-user-id");

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
    const supabaseRepository = createSupabaseRepository(supabase);
    const roomsService = createRoomsService(supabaseRepository);

    return { playerId, roomsService };
  },
});

export default server;
