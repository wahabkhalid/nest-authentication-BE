import { Category } from '../../category/entities/category.entity';
import { ISeeder } from '../../types/seeder.type';

export const CategorySeeder: ISeeder<Category> = {
  getData: (): Partial<Category>[] => {
    return [
      {
        id: 'c8c2d89f-d9c5-4b1c-9d17-aabd57ad9549',
        label: 'Animals: Birds',
        key: 'animals-birds',
        url: 'category/bird',
      },
      {
        id: '9235af9e-1f84-41cf-819a-a2fa53ba8f2d',
        label: 'Animals: Domesticated',
        key: 'animals-domesticated',
        url: 'category/domesticated',
      },
      {
        id: '514251e8-b96c-4892-b6a3-0c394267847b',
        label: 'Animals: Fantasy',
        key: 'animals-fantasy',
        url: 'category/fantasy',
      },
      {
        id: '72d2f554-349f-4e9b-a31d-8c68af542f55',
        label: 'Animals: Farm',
        key: 'animals-farm',
        url: 'category/farm',
      },
      {
        id: 'c6460283-5450-4a06-ba61-4b6cfb8516f1',
        label: 'Animals: Forest',
        key: 'animals-forest',
        url: 'category/forest',
      },
      {
        id: '8ec7d637-46a7-493f-8d23-6a9b4b3c3299',
        label: 'Animals: Insects',
        key: 'animals-insects',
        url: 'category/insects',
      },
      {
        id: '54c9f9fe-df94-40bb-919d-f1a4f850e466',
        label: 'Animals: Prehistoric',
        key: 'animals-prehistoric',
        url: 'category/prehistoric',
      },
      {
        id: 'a8e9d7a0-01ca-4c6e-ae07-055d833fd4ca',
        label: 'Animals: Sea Creatures',
        key: 'animals-sea-creatures',
        url: 'category/sea-creatures',
      },
      {
        id: '2b8f5361-d43e-4153-9155-7fa325b30921',
        label: 'Animals: Wild',
        key: 'animals-wild',
        url: 'category/wild',
      },
      {
        id: '9bcff54e-e29e-4d96-b540-82409dae3589',
        label: 'Barriers',
        key: 'barriers',
        url: 'category/barriers',
      },
      {
        id: '08917ddd-3282-4155-adcd-2c5ee218553b',
        label: 'Buildings',
        key: 'buildings',
        url: 'category/building',
      },
      {
        id: '4b642c34-6f63-4f0d-9f9a-d8fad81ee2ee',
        label: 'Food',
        key: 'food',
        url: 'category/food',
      },
      {
        id: '71852e64-4208-48f3-b1b2-663c28c64160',
        label: 'Plants',
        key: 'plants',
        url: 'category/plant',
      },
      {
        id: 'fc22daf9-6a1a-4e7f-ac4d-0acd758e12af',
        label: 'Spiritual/Religious',
        key: 'spiritual-religious',
        url: 'category/spiritual',
      },
      {
        id: 'a53686ef-d85f-4704-9363-a587c7db3b54',
        label: 'People: Fighting Figures',
        key: 'people-fighting-figures',
        url: 'category/fighting',
      },
      {
        id: '895cfc5f-2759-467f-b319-b8429fab9124',
        label: 'People: Fantasy Figures',
        key: 'people-fantasy-figures',
        url: 'category/fantasy-fig',
      },
      {
        id: 'e6b81dd3-1f3d-44f0-b0a7-dc75da4dad13',
        label: 'People: Everyday People',
        key: 'people-everyday-people',
        url: 'category/everyday-people',
      },
      {
        id: '196c530c-b912-444a-965b-297a0bcd3cc9',
        label: 'Vehicles',
        key: 'vehicles',
        url: 'category/vehicle',
      },
      {
        id: 'fa436e7e-fba6-4950-81be-241ff444723a',
        label: 'Rocks, Shells, and Fossils',
        key: 'rocks-shells-fossils',
        url: 'category/shell',
      },
      {
        id: 'b6da0507-5363-4f30-92a9-0bfa77db3720',
        label: 'Mountains, Caves, and Volcanoes',
        key: 'mountains-caves-volcanos',
        url: 'category/volcano',
      },
      {
        id: 'a804a74e-edfe-4649-a5fc-b38d0493aa30',
        label: 'Miscellaneous',
        key: 'miscellaneous',
        url: 'category/misc',
      },
    ];
  },
};
