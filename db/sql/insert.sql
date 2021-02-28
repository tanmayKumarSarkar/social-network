    -------User-------
INSERT INTO test.User values (DEFAULT, 'Tanmay', 'tanmay@gmail.com', false);
INSERT INTO test.User values (DEFAULT, 'Arka', 'arka@gmail.com', false);
INSERT INTO test.User values (DEFAULT, 'Rahul', 'Rahul@gmail.com', false);

    -------Follow-------
INSERT INTO test.Follow values (1,2);
INSERT INTO test.Follow values (1,3);
INSERT INTO test.Follow values (2,1);


    -------Post-------
INSERT INTO test.Post values (DEFAULT, 'Sample post Title 1', 'This is a sample Post Body 1', 2, 0, 0, DEFAULT, now() );
INSERT INTO test.Post values (DEFAULT, 'Sample post Title 2', 'This is a sample Post Body 2', 3, 1, 0, DEFAULT, now() );
INSERT INTO test.Post values (DEFAULT, 'Sample post Title 3', 'This is a sample Post Body 3', 2, 1, 0, DEFAULT, now() );
INSERT INTO test.Post values (DEFAULT, 'Sample post Title 4', 'This is a sample Post Body 4', 2, 2, 1, DEFAULT, now() );
INSERT INTO test.Post values (DEFAULT, 'Sample post Title 5', 'This is a sample Post Body 5', 3, 3, 3, DEFAULT, now() );



    -------Comment-------
INSERT INTO test.Comment values (DEFAULT, 'This is a sample Comment 1', 3, 1, DEFAULT, now());
INSERT INTO test.Comment values (DEFAULT, 'This is a sample Comment 2', 1, 2, DEFAULT, now());
INSERT INTO test.Comment values (DEFAULT, 'This is a sample Comment 3', 2, 3, DEFAULT, now());
INSERT INTO test.Comment values (DEFAULT, 'This is a sample Comment 4', 1, 4, DEFAULT, now());
INSERT INTO test.Comment values (DEFAULT, 'This is a sample Comment 5', 3, 5, DEFAULT, now());
INSERT INTO test.Comment values (DEFAULT, 'This is a sample Comment 6', 3, 3, DEFAULT, now());
INSERT INTO test.Comment values (DEFAULT, 'This is a sample Comment 7', 3, 2, DEFAULT, now());
INSERT INTO test.Comment values (DEFAULT, 'This is a sample Comment 8', 2, 1, DEFAULT, now());

