USE KFC
GO



DELETE FROM Carts;
DBCC CHECKIDENT ('KFC.dbo.Carts', RESEED, 0);
GO
DELETE FROM InvoiceDetails;
DBCC CHECKIDENT ('KFC.dbo.InvoiceDetails', RESEED, 0);
GO
DELETE FROM Invoices;
DBCC CHECKIDENT ('KFC.dbo.Invoices', RESEED, 0);
GO
DELETE FROM Products;
DBCC CHECKIDENT ('KFC.dbo.Products', RESEED, 0);
GO
DELETE FROM Categories;
DBCC CHECKIDENT ('KFC.dbo.Categories', RESEED, 0);
GO
GO

DELETE FROM Comments;
DBCC CHECKIDENT ('KFC.dbo.Comments', RESEED, 0);
GO
DELETE FROM Rates;
DBCC CHECKIDENT ('KFC.dbo.Rates', RESEED, 0);
GO
DELETE FROM WishLists;
DBCC CHECKIDENT ('KFC.dbo.WishLists', RESEED, 0);
GO
DELETE FROM Promotions;
DBCC CHECKIDENT ('KFC.dbo.Promotions', RESEED, 0);
GO
DELETE FROM PromotionProducts;
DBCC CHECKIDENT ('KFC.dbo.PromotionProducts', RESEED, 0);
GO


INSERT INTO InvoiceStatuses (Name) VALUES (N'Đã đặt');
INSERT INTO InvoiceStatuses (Name) VALUES (N'Đang giao');
INSERT INTO InvoiceStatuses (Name) VALUES (N'Đã giao');
INSERT INTO InvoiceStatuses (Name) VALUES (N'Đã thanh toán');
INSERT INTO InvoiceStatuses (Name) VALUES (N'Đã Huỷ');



SET IDENTITY_INSERT [dbo].[Categories] OFF;

INSERT INTO Categories( Name, Image) VALUES (N'Ưu Đãi','UuDai.jpg');
INSERT INTO Categories( Name, Image) VALUES (N'Món Mới','MON MOI.jpg');
INSERT INTO Categories(Name, Image) VALUES (N'Combo 1 người','COMBO 1 NGUOI.jpg');
INSERT INTO Categories( Name, Image) VALUES (N'Combo Nhóm','COMBO NHOM.jpg');
INSERT INTO Categories( Name, Image) VALUES (N'Gà Rán - Gà Quay','GA.jpg');
INSERT INTO Categories( Name, Image) VALUES (N'Berger - Cơm - Mì ý','COM.jpg');
INSERT INTO Categories( Name, Image) VALUES (N'Thức Ăn Nhẹ','MON AN NHE.jpg');
INSERT INTO Categories( Name, Image) VALUES (N'Thức Uống & Tráng Miệng','TRANG MIENG.jpg');

SET IDENTITY_INSERT [dbo].[Products] OFF;
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo vui vẻ',N'3 Miếng Gà Rán + 1 Pepsi lon','combo-vui-ve.jpg',95000,1,1,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo hân hoan',N'5 Miếng Gà Rán + 2 Pepsi lon', 'combo-han-hoan.jpg',175000,1,1,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo tưng bừng',N'7 Miếng Gà Rán + 3 Pepsi lon','combo-tung-bung.jpg',255000,1,1,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'1 Gà Địa Trung Hải',N'1 Miếng Gà Địa Trung Hải','1-ga-cuon-dia-trung-hai.jpg',41000,1,2,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'2 Gà Địa Trung Hải',N'2 Miếng Gà Địa Trung Hải','2-ga-cuon-dia-trung-hai.jpg',79000,1,2,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'3 Gà Địa Trung Hải', N'3 Miếng Gà Địa Trung Hải', '3-ga-cuon-dia-trung-hai.jpg',117000,1,2,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'6 Gà Địa Trung Hải', N'6 Miếng Gà Địa Trung Hải', '6-ga-cuon-dia-trung-hai.jpg',231000,1,2,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Gà Địa Trung Hải A', N'1 Miếng Gà Địa Trung Hải + 1 Burger (bất kỳ) + 1 Pepsi Lon', 'combo-ga-cuon-dia-trung-hai-a.jpg',93000,1,2,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Gà Địa Trung Hải B', N'2 Miếng Gà Địa Trung Hải + 1 Gà Viên Popcorn (vừa) + 1 Pepsi Lon', 'combo-ga-cuon-dia-trung-hai-b.jpg',125000,1,2,5); 
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Gà Địa Trung Hải C',N'3 Miếng Gà Địa Trung Hải + 1 Miếng Gà (bất kỳ) + 3 Gà Miếng Nuggets + 2 Pepsi Lon','combo-ga-cuon-dia-trung-hai-c.jpg',199000,1,2,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate)VALUES (N'1 Gà Cuộn Bắc Kinh',N'01 Gà Cuộn Bắc Kinh','1-ga-cuon-bac-kinh.jpg',39000,1,2,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'2 Gà Cuộn Bắc Kinh',N'02 Gà Cuộn Bắc Kinh','2-ga-cuon-bac-kinh.jpg',74000,1,2,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Gà Cuộn Bắc Kinh HD',N'01 Gà Cuộn Bắc Kinh + 01 miếng Gà rán (OR/ HS/ NSC) + 01 Khoai tây chiên (vừa) hoặc 01 Khoai tây nghiền (vừa) & 01 Bắp cải trộn (vừa)','combo-ga-cuon-bac-kinh.jpg',89000,1,2,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'1 Gà Que Kem Xốt Cajun',N'1 Gà Que Kem Xốt Cajun', '1-Cajun.jpg',40000,1,2,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'2 Gà Que Kem Xốt Cajun',N'2 Gà Que Kem Xốt Cajun','2-Cajun.jpg',74000,1,2,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Gà Que Kem Xốt Cajun A',N'1 Gà Que Kem Xốt Cajun + 1 Burger + 1 Pepsi Lon','A-Cajun.jpg',91000,1,3,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Gà Que Kem Xốt Cajun B',N'1 Gà Que Kem Xốt Cajun + 1 Miếng Gà + 1 Pepsi Lon','B-Cajun.jpg',89000,1,3,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Pepsi Không Calo Lon',N'Pepsi Không Calo Lon','pepsi-zero.jpg',17000,1,3,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Gà Zero HD',N'02 Miếng Gà Rán + 02 Gà Miếng Nuggets + 01 Pepsi Không Calo Lon','combo-pepsi-zero.jpg',96000,1,3,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Gà Rán',N'2 Miếng Gà +1 Khoai tây chiên vừa / 2 Gà Miếng Nuggets + 1 Lipton vừa','D1-new.jpg',87000,1,3,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Mì Ý',N'1 Mì Ý Xốt Cà Gà Viên + 1 Miếng Gà+ 1 Lon Pepsi Can','D3-new.jpg',87000,1,3,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Salad Hạt',N'1 Miếng Gà + 1 Salad Hạt + 1 Lon Pepsi','D4-new.jpg',78000,1,4,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Burger',N'1 Burger Zinger/Burger Gà Quay Flava/Burger Tôm + 1 Miếng Gà Rán + 1 Lon Pepsi','D5.jpg',89000,1,4,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Nhóm 1',N'3 Miếng Gà + 1 Burger Zinger/Burger Tôm/Burger Phi-lê Gà Quay + 2 Lon Pepsi','D6.jpg',172000,1,4,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Nhóm 2',N'4 Miếng Gà + 1 Khoai tây chiên lớn / 2 Thanh Bí Phô-mai + 2 Pepsi Lon','D7-new.jpg',191000,1,4,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Combo Nhóm 3',N'5 Miếng Gà + 1 Popcorn (Vừa) / 4 Gà Miếng Nuggets+ 2 Pepsi Lon','D8-new.jpg',288000,1,4,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'1 Miếng Gà Rán',N'1 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay','1-Fried-Chicken.jpg',35000,1,4,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'2 Miếng Gà Rán',N'2 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay','2-Fried-Chicken.jpg',70000,1,4,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'3 Miếng Gà Rán',N'3 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay','3-Fried-Chicken.jpg',1030000,1,4,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'6 Miếng Gà Rán',N'6 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay','6-Fried-Chicken-new.jpg',2010000,1,4,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'1 Miếng Đùi Gà Quay',N'1 Miếng Đùi Gà Quay Giấy Bạc/Đùi Gà Quay Tiêu','BJ.jpg',74000,1,5,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'1 Miếng Đùi Gà Quay',N'1 Miếng Đùi Gà Quay Giấy Bạc/Đùi Gà Quay Tiêu','BJ.jpg',74000,1,5,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'1 Miếng Phi-lê Gà Quay',N'1 Miếng Phi-lê Gà Quay Flava/Phi-lê Gà Quay Tiêu','MOD-PHI-LE-GA-QUAY.jpg',38000,1,5,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'3 Cánh Gà Hot Wings',N'3 Cánh Gà Hot Wings','3-HW.jpg',54000,1,5,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'5 Cánh Gà Hot Wings',N'5 Cánh Gà Hot Wings','5-HW.jpg',83000,1,5,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Gà Viên (Vừa)',N'Gà Viên (Vừa)','POP-R.jpg',38000,1,5,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Gà Viên (Lớn)',N'Gà Viên (Lớn)','POP-L.jpg',63000,1,5,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'3 Gà Miếng Nuggets',N'3 Gà Miếng Nuggets','3_Nuggests.jpg',27000,1,5,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'5 Gà Miếng Nuggets',N'5 Gà Miếng Nuggets','5_Nuggests.jpg',40000,1,5,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Burger Zinger',N'1 Burger Zinger','Burger-Zinger.jpg',54000,1,6,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Burger Tôm',N'1 Burger Tôm','Burger-Shrimp.jpg',44000,1,6,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Burger Gà Quay Flava',N'1 Burger Gà Quay Flava','Burger-Flava.jpg',54000,1,6,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Cơm Gà Xiên Que',N'1 Cơm Gà Xiên Que','Rice-Skewer.jpg',45000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Salad Hạt',N'1 Salad Hạt','SALAD-HAT.jpg',35000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Salad Pop',N'1 Salad Hạt Gà Viên Popcorn','SALAD-HAT-GA-VIEN.jpg',38000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'3 Cá Thanh',N'3 Cá Thanh','3-Fishsticks.jpg',40000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'2 Xiên Tenderods',N'2 Xiên Tenderods','2-Tenderods.jpg',40000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'4 Phô Mai Viên',N'4 Phô Mai Viên','4-Chewy-Cheese.jpg',34000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'6 Phô Mai Viên',N'6 Phô Mai Viên','6-Chewy-Cheese.jpg',44000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Khoai Tây Chiên (Vừa)',N'Khoai Tây Chiên (Vừa)','FF-R.jpg',19000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'1 Bánh Trứng',N'1 Bánh Trứng','1-eggtart.jpg',18000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'4 Bánh Trứng',N'4 Bánh Trứng','4-eggtart.jpg',58000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'2 Viên Khoai Môn Kim Sa',N'2 Viên Khoai Môn Kim Sa','2-taro.jpg',26000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'3 Viên Khoai Môn Kim Sa',N'3 Viên Khoai Môn Kim Sa','3-taro.jpg',36000,1,7,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Pepsi Lon',N'Pepsi Lon','Pepsi-Can.jpg',15000,1,8,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'7Up Lon',N'7Up Lon','7Up-Can.jpg',15000,1,8,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Aquafina 500ml',N'Aquafina 500ml','Aquafina-500ml.jpg',10000,1,8,5);
INSERT INTO Products ( Name,Description,Image,Price,Status,CategoryId,Rate) VALUES (N'Trà Đào',N'Trà Đào','Peach-Tea.jpg',45000,1,8,5);


