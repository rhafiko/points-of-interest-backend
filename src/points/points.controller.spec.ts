import { Test } from '@nestjs/testing';
import { PointsController } from './points.controller';
import { PointsService } from './services/points.service';

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

const mockUser = {
  username: 'user1',
  id: 'bd9086de-65ff-4ecf-a015-26f52637aebb',
  password: 'superPassord123',
  points: [],
};

const mockPointsSerice = () => ({
  getPoints: jest.fn(),
  getPointById: jest.fn(),
  createPoint: jest.fn(),
  deletePoint: jest.fn(),
});

describe('PointsController', () => {
  let pointsController: PointsController;
  let pointsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PointsController],
      providers: [
        PointsController,
        { provide: PointsService, useFactory: mockPointsSerice },
      ],
    }).compile();

    pointsService = module.get<PointsService>(PointsService);
    pointsController = module.get<PointsController>(PointsController);
  });

  describe('getPoints', () => {
    it('calls PointsService.getPoints and returns the result', async () => {
      pointsService.getPoints.mockResolvedValue(mockPoints);
      const result = await pointsController.getPoints(null, mockUser);
      expect(result).toEqual(mockPoints);
    });
  });

  describe('getPointById', () => {
    it('calls PointsService.getPointById and returns the result', async () => {
      pointsService.getPointById.mockResolvedValue(mockPoints[0]);
      const result = await pointsController.getPointById(null, mockUser);
      expect(result).toEqual(mockPoints[0]);
    });
  });

  describe('createPoint', () => {
    it('calls PointsService.createPoint and returns it', async () => {
      const newMockPoint = [
        {
          id: 'acedb3a2-4478-4ea5-b355-a1a85180a067',
          lat: '-25.620555091533248',
          lng: '-49.33805465698242',
          title: 'New Mock Point',
        },
      ];

      pointsService.createPoint.mockResolvedValue(newMockPoint);
      const result = await pointsController.createPoint(null, mockUser);
      expect(result).toEqual(newMockPoint);
    });
  });

  describe('deletePoint', () => {
    it('calls PointsService.deletePoint and remove it', async () => {
      pointsService.deletePoint.mockResolvedValue();
      const result = await pointsController.deletePoint(
        'acedb3a2-4478-4ea5-b355-a1a85180a067',
        mockUser,
      );
      expect(result).toBeUndefined;
    });
  });
});
