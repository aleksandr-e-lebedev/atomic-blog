import { faker } from "@faker-js/faker";

import type { PostType } from "@/types";

export function createRandomPost(): PostType {
  return {
    id: crypto.randomUUID(),
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

export function sleep(ms = Math.random() * 800): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}
