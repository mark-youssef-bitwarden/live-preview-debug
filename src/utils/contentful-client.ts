import {
  createClient,
  type EntryCollection,
  type EntrySkeletonType,
  type EntrySys,
  type OrderFilterPaths,
} from "contentful";

export async function getEntry<T extends EntrySkeletonType>(
  id: string,
  options: {
    space: string;
    previewToken: string;
    locale?: string;
    environment?: string;
  }
) {
  const client = createClient({
    space: options.space,
    accessToken: options.previewToken,
    host: "preview.contentful.com",
    environment: options.environment,
  });
  return client.withoutUnresolvableLinks.getEntry<T>(id, {
    include: 10,
    locale: options.locale || "en-US",
  });
}

type GetContentProps = {
  contentType: string;
  skip?: number;
  limit?: number;
  include?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | undefined;
  order?: OrderFilterPaths<EntrySys, "sys">[];
  locale?: string;
  options: {
    space: string;
    previewToken: string;
    environment: string;
  };
};

export async function getContent<T extends EntrySkeletonType>({
  contentType,
  skip,
  limit,
  include,
  order,
  locale,
  options,
}: GetContentProps): Promise<EntryCollection<T, "WITHOUT_UNRESOLVABLE_LINKS">> {
  const client = createClient({
    space: options.space,
    accessToken: options.previewToken,
    environment: options.environment,
    host: "preview.contentful.com",
  });
  return client.withoutUnresolvableLinks
    .getEntries<T>({
      include,
      content_type: contentType,
      limit,
      skip,
      order,
      locale,
    })
    .then((results) => results);
}
