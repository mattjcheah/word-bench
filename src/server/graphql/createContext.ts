import { YogaInitialContext } from "@graphql-yoga/node";
import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "../../server/environment";
import createSupabaseRepository from "../../server/repositories/createSupabaseRepository";
import createRoomsService, {
  RoomsService,
} from "../../server/services/createRoomsService";

export type GraphQLContext = { playerId: string; roomsService: RoomsService };

type CreateContext = (initialContext: YogaInitialContext) => GraphQLContext;

const createContext: CreateContext = ({ request }) => {
  const playerId = request.headers.get("x-user-id");

  if (!playerId) {
    throw new Error("A user ID was not provided");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const supabaseRepository = createSupabaseRepository(supabase);
  const roomsService = createRoomsService(supabaseRepository);

  return { playerId, roomsService };
};
export default createContext;
