DBCC CHECKIDENT ('[ItemStatus]', RESEED, 0);
GO

INSERT INTO ItemStatus (Description)
VALUES ('Removed'), ('Done'),('Active')