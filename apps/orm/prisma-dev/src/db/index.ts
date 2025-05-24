import { injectable, inject } from "inversify";
import { PrismaClient } from "../../generated/prisma/client";

@injectable()
export class PrismaDB {
  prisma: PrismaClient;
  constructor(@inject("PrismaClient") PrismaClient: () => PrismaClient) {
    this.prisma = PrismaClient();
  }
}
