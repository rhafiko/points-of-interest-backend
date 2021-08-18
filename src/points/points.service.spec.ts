import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PointsRepository } from './points.repository';
import { PointsService } from './points.service';

const mockPointsRepository = () => ({
  getPoints: jest.fn(),
  findOne: jest.fn(),
  createPoint: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
});

const mockUser = {
  username: 'user1',
  id: 'bd9086de-65ff-4ecf-a015-26f52637aebb',
  password: 'superPassord123',
  points: [],
};

const mockPoints = [
  {
    id: 'bd9086de-65ff-4ecf-a015-26f52637aebb',
    lat: '-25.489614314365355',
    lng: '-49.26093578338623',
    title: 'Mock Place 01',
  },
  {
    id: '4110786a-57cc-42d4-9a31-d45852252007',
    lat: '-25.506812802663905',
    lng: '-49.24192428588867',
    title: 'Mock Place 02',
  },
  {
    id: 'c0e8f1c2-90b7-495e-a95e-6be62e530985',
    lat: '-25.491473729092522',
    lng: '-49.27315056324005',
    title: 'Mock Place 03',
  },
];

describe('PointsService', () => {
  let pointsService: PointsService;
  let pointsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PointsService,
        { provide: PointsRepository, useFactory: mockPointsRepository },
      ],
    }).compile();

    pointsService = module.get(PointsService);
    pointsRepository = module.get(PointsRepository);
  });

  describe('getPoints', () => {
    it('calls PoinstRepository.getPoints and returns the result', async () => {
      pointsRepository.getPoints.mockResolvedValue(mockPoints);
      const result = await pointsService.getPoints(null, mockUser);
      expect(result).toEqual(mockPoints);
    });
  });

  describe('getPointById', () => {
    it('calls PointsRepository.findOne and return de result', async () => {
      pointsRepository.findOne.mockResolvedValue(mockPoints[0]);
      const result = await pointsService.getPointById(
        'bd9086de-65ff-4ecf-a015-26f52637aebb',
        mockUser,
      );
      expect(result).toEqual(mockPoints[0]);
    });

    it('calls PointsRepository.findOne and handles an error', async () => {
      pointsRepository.findOne.mockResolvedValue(null);
      expect(
        pointsService.getPointById(
          'bd9086de-65ff-4ecf-a015-26f52637aebb',
          mockUser,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('createPoint', () => {
    it('calls PoinstRepository.createPoint, create new point and returns the result', async () => {
      const newMockPoint = [
        {
          id: 'acedb3a2-4478-4ea5-b355-a1a85180a067',
          lat: '-25.620555091533248',
          lng: '-49.33805465698242',
          title: 'New Mock Point',
        },
      ];
      pointsRepository.createPoint.mockResolvedValue(newMockPoint);
      const result = await pointsService.createPoint(null, mockUser);
      expect(result).toEqual(newMockPoint);
    });
  });

  describe('deletePoint', () => {
    it('calls PointsRepository.delete and remove the register', async () => {
      const rowsAffected = { affected: undefined };
      pointsRepository.delete.mockResolvedValue(rowsAffected);
      const result = await pointsService.deletePoint(
        'bd9086de-65ff-4ecf-a015-26f52637aebb',
        mockUser,
      );
      expect(result).toBeUndefined;
    });

    it('calls PointsRepository.delete and handles an error', async () => {
      const rowsAffected = { affected: 0 };
      pointsRepository.delete.mockResolvedValue(rowsAffected);
      expect(
        pointsService.deletePoint(
          'bd9086de-65ff-4ecf-a015-26f52637aebb',
          mockUser,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
